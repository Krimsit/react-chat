import { axios } from "core"

const route = {
    getAll: () => axios.get("/dialogs"),
    create: ({ partner, text }) => axios.post("/dialogs", { partner, text }),
}

export default route
