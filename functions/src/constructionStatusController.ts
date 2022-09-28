import { Response } from "express"
import { db } from './config/firebase'

type ConstructionStatusType = {
  text: string,
}

type Request = {
  body: ConstructionStatusType,
  params: { constructionStatusId: string }
}

const addConstructionStatus = async (req: Request, res: Response) => {
  const { text } = req.body
  try {
    const constructionStatus = db.collection('construction_status').doc()
    const constructionStatusObject = {
      id: constructionStatus.id,
      text,
    }

    await constructionStatus.set(constructionStatusObject)

    res.status(200).send({
      status: 'success',
      message: 'Construction Status added successfully',
      data: constructionStatusObject
    })
  } catch(error) {
      res.status(500).send('Something broke!')
  }
}

const getAllConstructionStatus = async (req: Request, res: Response) => {
  try {
    const allConstructionStatus: ConstructionStatusType[] = []
    const querySnapshot = await db.collection('construction_status').get()
    querySnapshot.forEach((doc: any) => allConstructionStatus.push(doc.data()))
    return res.status(200).json(allConstructionStatus)
  } catch(error) { return res.status(500).send('Something broke!') }
}

const updateConstructionStatus = async (req: Request, res: Response) => {
  const { body: { text }, params: { constructionStatusId } } = req

  try {
    const constructionStatus = db.collection('construction_status').doc(constructionStatusId)
    const currentData = (await constructionStatus.get()).data() || {}

    const constructionStatusObject = {
      text: text || currentData.text,
    }

    await constructionStatus.set(constructionStatusObject).catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'Construction Status updated successfully',
      data: constructionStatusObject
    })
  }
  catch(error) { return res.status(500).send('Something broke!') }
}

const deleteConstructionStatus = async (req: Request, res: Response) => {
  const { constructionStatusId } = req.params

  try {
    const constructionStatus = db.collection('construction_status').doc(constructionStatusId)

    await constructionStatus.delete().catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'Construction Status deleted successfully',
    })
  }
  catch(error) { return res.status(500).send('Something broke!') }
}

export { addConstructionStatus, getAllConstructionStatus, updateConstructionStatus, deleteConstructionStatus }