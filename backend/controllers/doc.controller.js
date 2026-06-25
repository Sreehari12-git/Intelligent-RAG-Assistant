import { getCollection } from "../config/chroma.js";

export const deleteDocument = async(req,res) => {
    try {
        const { fileName} = req.body;

        if (!fileName) {
            return res.status(400).json({
            message: "fileName is required"
            });
        }

        const collection = await getCollection();

        const existing = await collection.get({
            where: {
                fileName: fileName
            }
        })

        if(existing.ids.length === 0) {
            return res.status(404).json({
                message: "No records found with that fileName"
            })
        }

        await collection.delete({
           ids: existing.ids
        });

       return res.status(200).json({
            message: "Document deleted successfully",
            deletedFile: fileName,
            chunksDeleted : existing.ids.length
      });

    } catch (error) {
        return res.status(500).json({
        message: "Error deleting document",
        error: error.message
        });
    }
};


export const listDocuments = async(req,res) => {
    try {
        const collection = await getCollection();
        const results = await collection.get();

        const files = [...new Set(results.metadatas.map(meta => meta.fileName).filter(Boolean))]

        res.json({files});
    }
    catch(error) {
        res.status(500).json({ message: "Error fetching documents", error: error.message });
    }
}

