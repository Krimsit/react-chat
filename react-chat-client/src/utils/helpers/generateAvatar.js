import tinycolor from "tinycolor2"

const getCorrectIndex = (number) => {
    return number > 255 ? 255 : number < 0 ? 0 : number
}

export default function generateAvatar(hash) {
    const [r, g, b] = hash
        .substr(0, 3)
        .split("")
        .map((char) => getCorrectIndex(char.charCodeAt(0)))
    return {
        color: tinycolor({ r, g, b }).lighten(20).saturate(20).toHexString(),
        colorLighten: tinycolor({ r, g, b })
            .lighten(40)
            .saturate(30)
            .toHexString(),
    }
}
