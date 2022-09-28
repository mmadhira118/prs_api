import { Response } from "express"
import { db } from './config/firebase'

type PostedByType = {
  text: string,
}

type Request = {
  body: PostedByType,
  params: { postedById: string }
}

const addPostedBy = async (req: Request, res: Response) => {
  const { text } = req.body
  try {
    const postedBy = db.collection('posted_by').doc()
    const postedByObject = {
      id: postedBy.id,
      text,
    }

    await postedBy.set(postedByObject)

    res.status(200).send({
      status: 'success',
      message: 'Posted By added successfully',
      data: postedByObject
    })
  } catch(error) {
      res.status(500).send('Something broke!')
  }
}

const getAllPostedBys = async (req: Request, res: Response) => {
  try {
    const allPostedBys: PostedByType[] = []
    const querySnapshot = await db.collection('posted_by').get()
    querySnapshot.forEach((doc: any) => allPostedBys.push(doc.data()))
    return res.status(200).json(allPostedBys)
  } catch(error) { return res.status(500).send('Something broke!') }
}

const updatePostedBy = async (req: Request, res: Response) => {
  const { body: { text }, params: { postedById } } = req

  try {
    const postedBy = db.collection('posted_by').doc(postedById)
    const currentData = (await postedBy.get()).data() || {}

    const postedByObject = {
      text: text || currentData.text,
    }

    await postedBy.set(postedByObject).catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'Posted By updated successfully',
      data: postedByObject
    })
  }
  catch(error) { return res.status(500).send('Something broke!') }
}

const deletePostedBy = async (req: Request, res: Response) => {
  const { postedById } = req.params

  try {
    const postedBy = db.collection('posted_by').doc(postedById)

    await postedBy.delete().catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'Posted By deleted successfully',
    })
  }
  catch(error) { return res.status(500).send('Something broke!') }
}

export { addPostedBy, getAllPostedBys, updatePostedBy, deletePostedBy }