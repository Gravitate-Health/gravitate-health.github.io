# Implementation Strategies for Preprocessors

Preprocessors are fundamental pluggable modules in the Federated Open-Source Platform and Services (FOSPS) focusing mechanism. Their core function is to systematically analyze and enrich raw Electronic Product Information (ePIs) by adding semantic annotations, transforming them into preprocessed ePIs (p(ePI)).

A critical compliance constraint for all preprocessors is that they **must not remove any original content** from the ePI. Modifications must be strictly limited to adding semantic annotations to the package leaflet sections; no other ePI fields should be edited.

The actual logic used by the preprocessor to identify relevant text and assign terms can follow one of several strategies:

1.  **Search Tree Algorithm:** This approach avoids complex AI techniques by using algorithms to search for **exact text fragments** or keywords within the ePI leaflet sections. These fragments may be drawn from a preprocessor-specific reference "database".
2. **Similiarity Algorithm:** This approach is similar to the previous, but instead of searching extact text it shifts throguth predetermined windows (i.e. sections, parragraphs, sentences, words) and finds similaritires with it's internal "database". One common way to do this is to use **regular expressions**. 
2.  **Natural Language Processing (NLP) ("Smart" Preprocessor):** This strategy utilizes Artificial Intelligence (AI) tools, particularly **Named Entity Recognition (NER)** models. NLP models analyze the text and its relation to standard terminologies, allowing the service to automatically annotate raw ePIs intelligently, preparing them for subsequent focusing operations.