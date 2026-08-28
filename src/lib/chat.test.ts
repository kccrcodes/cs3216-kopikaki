import assert from "node:assert/strict";

import { canChatWithKaki, chatId, parseChatText } from "./chat";

assert.equal(chatId("user-b", "user-a"), chatId("user-a", "user-b"));
assert.equal(chatId("user-a", "user-b"), "user-a_user-b");

assert.equal(parseChatText("  Hello there  "), "Hello there");
assert.throws(() => parseChatText(""), /empty/i);
assert.throws(() => parseChatText("x".repeat(501)), /long/i);
assert.equal(canChatWithKaki({ hasAccount: true }), true);
assert.equal(canChatWithKaki({ hasAccount: false }), false);
assert.equal(canChatWithKaki(null), false);

console.log("chat helpers passed");
