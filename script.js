const wordsInput = document.getElementById("words");
const wordContainer = document.getElementById("word-container");
let currentWordIndex = 0;
let currentLetterIndex = 0;
if (!wordsInput || !wordContainer) {
    console.error("Missing required HTML elements.");
} else {
    const fetchWords = async () => {
        const wordCount = wordsInput.value || 10;
        try {
            const response = await fetch(`https://random-word-api.vercel.app/api?words=${wordCount}`);
            if (!response.ok) throw new Error("Failed to fetch words");
            return await response.json();
        } catch (error) {
            console.error("Error fetching words:", error);
            return [];
        }
    };

    const renderWords = async () => {
        const words = ["i", "love", "you"];
        wordContainer.innerHTML = "";
        currentLetterIndex = 0;
        currentWordIndex = 0;
        // Create caret once
        const caret = document.createElement("div");
        caret.classList.add("caret", "w-1", "h-10", "bg-white");
        wordContainer.appendChild(caret);

        // Use document fragment for better performance
        const fragment = document.createDocumentFragment();

        words.forEach(wordText => {
            const word = document.createElement("div");
            word.classList.add("word", "flex");

            wordText.split("").forEach(letterChar => {
                const letter = document.createElement("div");
                letter.classList.add("letter");
                letter.innerText = letterChar;
                word.appendChild(letter);
            });

            fragment.appendChild(word);
        });

        wordContainer.appendChild(fragment);
    };

    // Event Listener for words input
    wordsInput.addEventListener("input", () => {
        renderWords();
    });

    // Trigger initial render
    renderWords();

    document.addEventListener("keydown", (e) => {
        const keyName = e.key === " " ? "Spacebar" : e.key.toUpperCase();

        const keyPressed = Array.from(document.querySelectorAll("kbd"))
            .find(kbd => kbd.innerText === keyName);

        const wordsElements = document.querySelectorAll(".word");
        const currentWord = wordsElements[currentWordIndex];
        if (!currentWord) console.log("end");
        const currentLetter = currentWord.querySelectorAll(".letter");
        if(currentLetterIndex < currentLetter.length){
            currentLetter[currentLetterIndex].classList.add("typed");
            if(e.key===" "){
                currentLetter[currentLetterIndex].classList.add("incorrect");
            }else if(e.key===currentLetter[currentLetterIndex].innerHTML){
                currentLetter[currentLetterIndex].classList.add("correct");
            }else{
                currentLetter[currentLetterIndex].classList.add("incorrect");
            }
            currentLetterIndex++;
        }else if(currentLetterIndex>=currentLetter.length){
            if(e.key==" "){
                currentWordIndex++;
                currentLetterIndex=0;
            }else{
            const extraletter = document.createElement("div");
            extraletter.classList.add("letter", "incorrect");
            extraletter.innerHTML = e.key;
            
            currentWord.appendChild(extraletter);
            currentLetterIndex++;
            };

        };

        if (keyPressed) {
            if(currentLetter[currentLetterIndex-1].classList.contains("correct")){
                keyPressed.classList.remove("flashcorrect");
                void keyPressed.offsetWidth; // Forces reflow for re-triggering animation
                keyPressed.classList.add("flashcorrect");
            }else{
                keyPressed.classList.remove("flashincorrect");
                void keyPressed.offsetWidth; // Forces reflow for re-triggering animation
                keyPressed.classList.add("flashincorrect");
            }

        }
       
        console.log(currentLetterIndex)

    });
};


