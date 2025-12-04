import { GoogleGenAI, FunctionDeclaration, Type, Chat, Content } from "@google/genai";
import { StoreTool } from '../types';
import { searchProducts, getOrderByID } from './mockStore';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define Tools
const searchTool: FunctionDeclaration = {
  name: StoreTool.SEARCH_PRODUCTS,
  description: 'Search for medical supplies and products in the store catalog. Use this when the user asks for product recommendations or checks availability.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: 'The search term or product description (e.g., "gloves", "blood pressure monitor").',
      },
    },
    required: ['query'],
  },
};

const trackOrderTool: FunctionDeclaration = {
  name: StoreTool.TRACK_ORDER,
  description: 'Check the status of a customer order using the Order ID.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      orderId: {
        type: Type.STRING,
        description: 'The unique order identifier (e.g., "ORD-12345").',
      },
    },
    required: ['orderId'],
  },
};

export class GeminiAssistant {
  private chat: Chat;

  constructor() {
    this.chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are the official AI Assistant for EMRN (Eastern Medical Rescue Network), found at emrn.ca.
        
        Your persona:
        - Professional, knowledgeable, and safety-conscious.
        - You assist healthcare professionals and the public in finding medical supplies.
        - You prioritize clarity and accuracy.
        - You are helpful, polite, and concise.
        
        Your goals:
        1. Assist customers in finding medical products using the ${StoreTool.SEARCH_PRODUCTS} tool.
        2. Help customers track their existing orders using the ${StoreTool.TRACK_ORDER} tool.
        3. Provide brief, accurate medical context for products (always disclaim you are an AI, not a doctor).
        
        Guidelines:
        - If a product is out of stock, suggest alternatives if possible.
        - If asked about shipping, standard shipping is 3-5 business days across Canada.
        - Always double-check order status before answering.
        `,
        tools: [{ functionDeclarations: [searchTool, trackOrderTool] }],
      },
    });
  }

  async sendMessage(message: string, onProductFound?: (products: any[]) => void): Promise<string> {
    try {
      // Send message using the SDK
      let response = await this.chat.sendMessage({ message });
      
      // Handle Function Calls
      let textResponse = '';
      
      const functionCalls = response.candidates?.[0]?.content?.parts?.filter(p => p.functionCall).map(p => p.functionCall);

      if (functionCalls && functionCalls.length > 0) {
         // Process function calls
         const functionResponseParts = [];

         for (const call of functionCalls) {
            if (!call || !call.name) continue;
            
            console.log("Executing tool:", call.name);
            let result: any = { error: "Tool execution failed" };

            if (call.name === StoreTool.SEARCH_PRODUCTS) {
               const query = call.args['query'] as string;
               const products = searchProducts(query);
               result = { productsFound: products.length, products };
               
               // Callback to UI to render product cards
               if (onProductFound && products.length > 0) {
                 onProductFound(products);
               }
            } else if (call.name === StoreTool.TRACK_ORDER) {
               const orderId = call.args['orderId'] as string;
               const order = getOrderByID(orderId);
               result = order ? order : { error: "Order not found" };
            }

            // Create function response part
            functionResponseParts.push({
               functionResponse: {
                   name: call.name,
                   response: { result: result },
                   id: call.id
               }
            });
         }

         // Send the function result back to the model
         response = await this.chat.sendMessage(functionResponseParts);
      }

      // Extract final text
      textResponse = response.text || "I'm having trouble connecting to the store database right now.";
      return textResponse;

    } catch (error) {
      console.error("Gemini Error:", error);
      return "I apologize, but I'm encountering a temporary system error. Please try again in a moment.";
    }
  }
}