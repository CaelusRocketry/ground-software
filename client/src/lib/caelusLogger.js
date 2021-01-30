const silencedCategories = new Set(["duplicate-json"]);

export default function caelusLogger(category, message, severity = "debug") {
  if (!silencedCategories.has(category)) {
    console.log(`[${category}] [${severity}]`, message);
  }
}
