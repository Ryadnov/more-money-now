import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Checkbox,
  Input,
  Form,
  Icon,
  Select,
  Drawer,
  Tooltip,
  Modal,
  Button,
  Upload
} from 'antd'

export default class RestoreBackup extends Component {
  state = { showModal: false }

  showModal = () => this.setState({ showModal: true })

  handleUpoadChange = info => {
    var reader = new FileReader()
    reader.onload = function(event) {
      var obj = JSON.parse(event.target.result)

      console.log('Loaded file', obj)
    }

    reader.readAsText(info.file)
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Import data
        </Button>

        <Modal title="Import" visible={this.state.showModal} footer={[]}>
          <Upload
            multiple={false}
            onChange={this.handleUpoadChange}
            accept=".json"
            beforeUpload={() => false}
          >
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </Modal>
      </div>
    )
  }
}
