class ErrorResponse extends Error{
  constructor(statusCode=500, message="Server error"){
    super(message)
    this.statusCode= statusCode
  }
}
module.exports= ErrorResponse