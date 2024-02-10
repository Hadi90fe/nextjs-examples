// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getData, setData } from "@/helpers/getters-setters";

// API Feedback Endpoint => api/feedback
export default async function handler(req, res) {
  const data = await getData();
  if (req.method === "POST") { //if req method = POST
    const settedData = await setData(req.body);
    res.status(201).json({message: 'Success !', data: settedData});
  } else { //if GET or something else
    res.status(200).json(data);
  }
}
