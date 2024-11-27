export const applyMaskedInput = (
    inputElement: HTMLInputElement,
    config: { character?: string } = {}
): { getOriginalValue: () => string } => {
    let originalValue : string = "";
    const character : string = config?.character ?? "*";

    const getCaretPosition = (el: HTMLInputElement): number => {
        return el.selectionStart ?? 0;
    }

    const setCaretPosition = (el: HTMLInputElement, position: number): void => {
        el.setSelectionRange(position, position);
    }

    inputElement.addEventListener("input", (e) => {
        const caretPosition : number = getCaretPosition(inputElement);
        const inputValue : string = inputElement.value;

        if (inputValue.length > originalValue.length) {
            const addedChar : string = (e as InputEvent).data || "";
            originalValue =
                originalValue.slice(0, caretPosition - 1) +
                addedChar +
                originalValue.slice(caretPosition - 1);
        } else if (inputValue.length < originalValue.length) {
            originalValue =
                originalValue.slice(0, caretPosition) +
                originalValue.slice(caretPosition + 1);
        }

        inputElement.value = character.repeat(originalValue.length);
        setCaretPosition(inputElement, caretPosition);
    });

    return {
        getOriginalValue: (): string => originalValue,
    };
}
