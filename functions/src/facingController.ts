import { Response } from "express"
import { db } from './config/firebase'

type FacingType = {
  text: string,
}

type Request = {
  body: FacingType,
  params: { facingId: string }
}

const addFacing = async (req: Request, res: Response) => {
  const { text } = req.body
  try {
    const facing = db.collection('facing').doc()
    const facingObject = {
      id: facing.id,
      text,
    }

    await facing.set(facingObject)

    res.status(200).send({
      status: 'success',
      message: 'Facing added successfully',
      data: facingObject
    })
  } catch(error) {
      res.status(500).send('Something broke!')
  }
}

const getAllFacing = async (req: Request, res: Response) => {
  try {
    const allFacing: FacingType[] = []
    const querySnapshot = await db.collection('facing').get()
    querySnapshot.forEach((doc: any) => allFacing.push(doc.data()))
    return res.status(200).json(allFacing)
  } catch(error) { return res.status(500).send('Something broke!') }
}

const updateFacing = async (req: Request, res: Response) => {
  const { body: { text }, params: { facingId } } = req

  try {
    const facing = db.collection('facing').doc(facingId)
    const currentData = (await facing.get()).data() || {}

    const facingObject = {
      text: text || currentData.text,
    }

    await facing.set(facingObject).catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'Facing updated successfully',
      data: facingObject
    })
  }
  catch(error) { return res.status(500).send('Something broke!') }
}

const deleteFacing = async (req: Request, res: Response) => {
  const { facingId } = req.params

  try {
    const facing = db.collection('facing').doc(facingId)

    await facing.delete().catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'Facing deleted successfully',
    })
  }
  catch(error) { return res.status(500).send('Something broke!') }
}

export { addFacing, getAllFacing, updateFacing, deleteFacing }