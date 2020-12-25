import mongoose from "mongoose"

mongoose.connect(
    "mongodb+srv://krimsit:ituj55hfll@chat.urzcn.mongodb.net/krimsit?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
)
