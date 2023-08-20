// This is the code for the copy button on the code blocks
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".copy").forEach(btn => {
        btn.addEventListener("click", e => {
            let text = e.target.parentElement.nextElementSibling.textContent;

            // Clean up the copied text
            text = text.replace(/^\s*|\s*$/g, "");

            navigator.clipboard.writeText(text);

            e.target.classList.add("copied");
            setTimeout(() => {
                e.target.classList.remove("copied");
            }, 3000);

            // e.target.textContent = "Copied";
            // setTimeout(() => {
            //     e.target.textContent = "Copy";
            // }, 3000);
        });
    });
});
