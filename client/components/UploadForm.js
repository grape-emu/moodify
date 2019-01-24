import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
// import { receiveImageUpload } from '../store';
import receiveImageUpload from '../store/upload'

class UploadForm extends Component {
  constructor() {
    super()
    this.state = {
      file: null
    }
    this.submitFile = this.submitFile.bind(this)
  }

  submitFile = async function(event) {
    event.preventDefault()
    const formData = new FormData()
    await receiveImageUpload(formData)
    // "then handle your response... ???"
  }

  handleFileUpload = event => {
    event.preventDefault()
    this.setState({file: event.target.file})
  }

  render() {
    return (
      <div>
        <h3>Upload your selfie here!</h3>
        <form onSubmit={this.submitFile}>
          <input
            type="file"
            id="uploaded-file-input"
            onChange={this.handleFileUpload}
          />
          <button type="submit" id="upload-button">
            Upload
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  file: state.upload.file
})

const mapDispatchToProps = dispatch => ({
  receiveImageUpload: file => receiveImageUpload(file)
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UploadForm)
)

// handleChange(event) {
//   this.setState({
//     filePath: event.target.value,
//     image: event.target.value
//   })
// }

// async handleUpdate(event) {
//   event.preventDefault()
//   this.setState({
//     image: event.target.value
//   })
//   await this.props.receiveImageUpload(someDataGoesHere)
// }
