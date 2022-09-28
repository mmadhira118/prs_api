import { Response } from "express"
import { db } from './config/firebase'

type BhkType = {
  text: string,
}

type Request = {
  body: BhkType,
  params: { bhkId: string }
}

const addBhk = async (req: Request, res: Response) => {
  const { text } = req.body
  try {
    const bhk = db.collection('bhk_types').doc()
    const bhkObject = {
      id: bhk.id,
      text,
    }

    await bhk.set(bhkObject)

    res.status(200).send({
      status: 'success',
      message: 'BHK added successfully',
      data: bhkObject
    })
  } catch(error) {
      res.status(500).send('Something broke!')
  }
}

const getAllBhk = async (req: Request, res: Response) => {
  try {
    const allBhk: BhkType[] = []
    const querySnapshot = await db.collection('bhk_types').get()
    querySnapshot.forEach((doc: any) => allBhk.push(doc.data()))
    return res.status(200).json(allBhk)
  } catch(error) { return res.status(500).send('Something broke!') }
}

const updateBhk = async (req: Request, res: Response) => {
  const { body: { text }, params: { bhkId } } = req

  try {
    const bhk = db.collection('bhk_types').doc(bhkId)
    const currentData = (await bhk.get()).data() || {}

    const bhkObject = {
      text: text || currentData.text,
    }

    await bhk.set(bhkObject).catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'BHK updated successfully',
      data: bhkObject
    })
  }
  catch(error) { return res.status(500).send('Something broke!') }
}

const deleteBhk = async (req: Request, res: Response) => {
  const { bhkId } = req.params

  try {
    const bhk = db.collection('bhk_types').doc(bhkId)

    await bhk.delete().catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'BHK deleted successfully',
    })
  }
  catch(error) { return res.status(500).send('Something broke!') }
}

export { addBhk, getAllBhk, updateBhk, deleteBhk }