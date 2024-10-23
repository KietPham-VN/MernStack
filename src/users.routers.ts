import express from 'express'
// dựng route
// userRouter
const userRouter = express.Router()

// những cái hàm nhận vào url rồi xử lý request và response được gọi là handler
// handler nằm ở giữa gọi là middleware có next
// còn ở cuối thì được gọi là controller không có next

// setup middleware cho userRouter
userRouter.use(
  (req, res, next) => {
    console.log('Time1: ', Date.now())
    return next()
    // res.status(400).send('Not Allowed')
  },
  (req, res, next) => {
    console.log('Time2: ', Date.now())
    return next()
  }
)
// do next() không làm dừng chương trình nên ta nên có thói quen dùng return next()
userRouter.get('/get-me', (req, res) => {
  res.json({
    data: {
      name: 'Kiệt',
      yob: 2005
    }
  })
})

export default userRouter
