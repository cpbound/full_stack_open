sequenceDiagram
title Adding a new note
note over Browser: Submitted form is sent in the body of the POST request
    Browser->>Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Server-->>Browser: HTTP returns status 302
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Browser: HTML document
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser: main.css (for page stylings)
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>Browser: main.js (for Javascript)
    note right of Browser: The browser executes the JS in main.js that fetches the JSON file from the server
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: HTTP returns data.json (a JSON document of all notes on server)
    note right of Browser: Browser executes an event handler, which renders the notes to the page using the DOM-API.
