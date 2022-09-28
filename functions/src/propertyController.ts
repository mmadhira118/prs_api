import { Response } from "express"
import { db } from './config/firebase'

type PropertyBodyParams = {
  title: string,
  text: string,
}

type Request = {
  body: PropertyBodyParams,
  params: { entryId: string }
}

const getAllProperties = async (req: Request, res: Response) => {
  try {
    const allProperties: PropertyBodyParams[] = []
    const querySnapshot = await db.collection('property_details').get()
    querySnapshot.forEach((doc: any) => allProperties.push(doc.data()))
    return res.status(200).json(allProperties)
  } catch(error) { return res.status(500).send('Something broke!') }
}

export { getAllProperties }