import mongoose from "mongoose"

const uri: any =
    "mongodb+srv://krimsit:ituj55hfll@chat.urzcn.mongodb.net/krimsit?retryWrites=true&w=majority"

mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) {
            return console.log(err)
        }
        console.log("DB CONNECTION")
    }
)
