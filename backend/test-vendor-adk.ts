/**
 * Test vendor ADK to ensure it has the fallback logic
 */

import "dotenv/config";

// Import from vendor path (like Heroku does)
import { LLMRegistry } from "./vendor/@iqai/adk/index.js";

async function testVendorADK() {
	console.log("🧪 Testing Vendor ADK (Heroku path)\n");

	// Test: gpt-4o-mini model
	console.log("Test: gpt-4o-mini model (OpenAI)");
	try {
		const model = LLMRegistry.newLLM("gpt-4o-mini");
		console.log("✅ Created LLM for gpt-4o-mini:", model.model);
	} catch (error: any) {
		console.log("❌ Error:", error.message);
	}

	// Test: gemini-1.5-flash model
	console.log("\nTest: gemini-1.5-flash model (Google)");
	try {
		const model = LLMRegistry.newLLM("gemini-1.5-flash");
		console.log("✅ Created LLM for gemini-1.5-flash:", model.model);
	} catch (error: any) {
		console.log("❌ Error:", error.message);
	}

	console.log("\n✨ Test completed!");
}

testVendorADK().catch(console.error);
