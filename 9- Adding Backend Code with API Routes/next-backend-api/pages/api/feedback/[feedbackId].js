import { getData } from "@/helpers/getters-setters";

// API Feedback/[feedbackId] Endpoint => api/feedback/[feedbackId]
export default async function handler(req, res) {
    const feedbackId = req.query.feedbackId;
    const data = await getData();
    const selectedFeedback = data.find(elem => elem.id === feedbackId);
    if (req.method === "DELETE") { //if req method = DELETE

    }
    return res.status(200).json({feedback: selectedFeedback});
}