export const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            res.sendStatus(500).json({
                success: false,
                message: error
            })
        }
    }
}