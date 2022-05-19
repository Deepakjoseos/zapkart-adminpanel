/* eslint-disable */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router'
import { customAttrubitesSchema } from 'utils/Schema'
import Form from 'components/Form'
// import { Input, Button } from 'antd'
import { Input, Radio, Select, Button, Icon, message } from 'antd'
import Upload from 'components/Upload'
import AddNew from 'components/CustomComponents/AddNew'
import { isEmpty, isUndefined } from 'lodash'
import { API_CUSTOM_ATTRIBUTES } from '_constants'
import { getFormData } from '../../../../utils/index'
import callApi from '../../../../utils/callApi'

const { Option, OptGroup } = Select

const CustomAttributes = ({ initialValues, handleSubmit, history, type, id = '' }) => {
  const [formItemsData, setformItemsData] = useState([{ _id: 'index[0]', deleted: false }])

  const [imageList, setimageList] = useState({})
  const [customImage, setcustomImage] = useState({})
  const initialVals = useMemo(() => {
    if (initialValues) {
      const { options } = initialValues
      const data = {}
      const imageListtemp = []
      const formcount = []
      if (!isEmpty(options)) {
        options.forEach((e, ind) => {
          const { value, filename, imagePath, _id } = e
          imageListtemp.push({ [`image[${ind}]`]: { filename, imagePath, _id } })
          data[`image[${ind}]`] = [
            {
              uid: _id,
              url: imagePath,
              filename,
            },
          ]
          data[`value[${ind}]`] = value
          formcount.push({ _id: `index[${ind}]`, id: _id, deleted: false, ...data })
        })
        setformItemsData(formcount)
        setimageList(imageListtemp)
        return { ...initialValues, ...data }
      }
      return { ...initialValues }
    }
    return {
      status: 'active',
      comparableOnfrontend: 'yes',
      useInRecemondation: true,
      useInFilter: 'yes',
    }
  }, [initialValues])

  const submitForm = async (formValue) => {
    console.log('Himlal', formValue)
    if (type === 'add') {
      try {
        if (conditions.includes(formValue.inputType)) {
          if (formItemsData.filter((e) => !e.deleted).length > 0) {
            const { mainValues } = formValue
            const values = []
            const image = []
            try {
              mainValues.forEach((e) => {
                if (e.deleted === false) {
                  const abc = e._id.split(/[[\]]{1,2}/)
                  let name = ''
                  try {
                    if (imageList[`value[${abc[1]}]`]) {
                      image.push(imageList[`value[${abc[1]}]`].originFileObj)
                      name = imageList[`value[${abc[1]}]`].name
                    }
                  } catch (e) {
                    console.log(e)
                  }

                  const value = formValue[`value[${abc[1]}]`]

                  if (value) {
                    values.push({ value, image: name })
                  } else {
                    throw 'Please input value'
                  }
                  // if (name && value) {
                  //   values.push({ value, image: name })
                  // } else {
                  //   throw 'Please input both value && image'
                  // }
                  // delete formValue[`value[${abc[1]}]`]
                  // delete formValue[`image[${abc[1]}]`]
                }
              })
              // delete formValue.mainValues
              if (formValue['']) {
                delete formValue['']
              }

              if (handleSubmit) {
                const data = { ...formValue, values }

                console.log('*** shailesh', data, customImage)
                const formData = getFormData(data)

                formItemsData.forEach((e, i) => {
                  try {
                    const getImage = customImage[`value[${i}]`].originFileObj
                    if (e.deleted === false && getImage) {
                      formData.append('customImage', customImage[`value[${i}]`].originFileObj)
                    }
                  } catch (e) {
                    console.log(e)
                  }
                })

                // Object.keys(customImage).forEach((key) => {
                //   if (customImage[key]) {
                //     if (customImage[key].originFileObject) {
                //       formData.append('customImage', customImage[key].originFileObject)
                //     }
                //   }
                // })

                try {
                  await callApi(API_CUSTOM_ATTRIBUTES.create, {
                    body: formData,
                    method: 'POST',
                    mode: 'no-cors',
                  })
                  history.go(-1)
                } catch (err) {
                  console.log(err)
                }
              }
            } catch (e) {
              message.error(e)
              return
            }
          } else {
            throw 'Dropdown/Multiple select should have value'
          }
        } else {
          const data = { ...formValue }
          if (handleSubmit) handleSubmit(data) //
        }
      } catch (e) {
        message.error(e)
        return
      }
    } else if (type === 'edit') {
      try {
        if (conditions.includes(formValue.inputType)) {
          if (formItemsData.filter((e) => !e.deleted).length > 0) {
            // const { options } = formValue
            const newvalues = []
            const image = []
            const values = []

            try {
              formItemsData
                .filter((e) => e.deleted === false)
                // .filter((e) => e.id === undefined)
                .forEach((e) => {
                  const abc = e._id.split(/[[\]]{1,2}/)
                  let name = ''

                  if (imageList[`value[${abc[1]}]`]?.originFileObj) {
                    image.push(imageList[`value[${abc[1]}]`].originFileObj)
                  }
                  name =
                    imageList[`value[${abc[1]}]`]?.name ||
                    imageList[`value[${abc[1]}]`]?.filename ||
                    ''

                  const value = formValue[`value[${abc[1]}]`]
                  // newvalues.push({ value, image: name,e.id })

                  if (value) {
                    values.push({ value, image: name, _id: e.id })
                  } else {
                    throw 'Please input value'
                  }

                  // if (name && value) {
                  //   values.push({ value, image: name, _id: e.id })
                  // } else {
                  //   throw 'Please input both value && image'
                  // }

                  // delete formValue[`value[${abc[1]}]`]
                  // delete formValue[`image[${abc[1]}]`]
                })

              // delete formValue.mainValues
              if (formValue['']) {
                delete formValue['']
              }

              if (handleSubmit) {
                // const data = { ...formValue, newvalues }
                const data = { ...formValue, values }

                const formData = getFormData(data)

                formItemsData.forEach((e, i) => {
                  try {
                    if (e.deleted === false && customImage[`value[${i}]`]?.originFileObj) {
                      formData.append('customImage', customImage[`value[${i}]`].originFileObj)
                    }
                  } catch (e) {
                    console.log(e)
                  }
                })

                // Object.keys(customImage).forEach((key) => {
                //   formData.append('customImage', customImage[key].originFileObj)
                // })
                formItemsData.forEach((e, index) => {
                  if (e.deleted === true) {
                    formData.append('deletedValues[]', formValue.options[index]._id)
                  }
                })
                delete formValue.options
                delete formValue.mainValues
                // customImage.forEach(({ value }) => {
                //   formData.append('customImage', value.originFileObj)
                // })
                try {
                  await callApi(`${API_CUSTOM_ATTRIBUTES.edit}/${id}`, {
                    body: formData,
                    method: 'PATCH',
                  })
                  history.go(-1)
                } catch (err) {
                  console.log(err)
                }
              }
            } catch (e) {
              console.log(e)
              message.error(e)
            }
          } else {
            throw 'Dropdown/Multiple select should have value'
          }
        } else {
          const data = { ...formValue }
          if (handleSubmit) handleSubmit(data) //
        }
      } catch (e) {
        message.error(e)
        return
      }
    }
  }

  const formItems = [
    {
      type: <Input name="label" />,
      key: 'label',
      label: 'Label',
    },
    {
      type: <Input />,
      key: 'code',
      label: 'Code',
    },
    {
      type: (
        <Select defaultValue="lucy">
          {/* <Option value="" selected="selected">
            Select
          </Option> */}
          <OptGroup label="Text">
            <Option value="field">Field</Option>
            <Option value="area">Area</Option>
          </OptGroup>
          <OptGroup label="Select">
            <Option value="drop-down">Drop-down</Option>
            <Option value="multiple-select">Multiple Select</Option>
          </OptGroup>
          <OptGroup label="Date">
            <Option value="date">Date</Option>
            <Option value="date&time">Date &amp; Time</Option>
            <Option value="time">Time</Option>
          </OptGroup>
          <OptGroup label="File">
            <Option value="file">File</Option>
          </OptGroup>
        </Select>
      ),
      key: 'inputType',
      label: 'Input Type',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="yes" value="yes">
            Yes
          </Radio.Button>
          <Radio.Button key="no" value="no">
            No
          </Radio.Button>
          {/* <Radio.Button key="none" value="none">
            None
          </Radio.Button> */}
        </Radio.Group>
      ),
      key: 'useInFilter',
      label: 'Use In Filter',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="active" value="active">
            Active
          </Radio.Button>
          <Radio.Button key="hold" value="hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="yes" value="yes">
            Yes
          </Radio.Button>
          <Radio.Button key="no" value="no">
            No
          </Radio.Button>
          {/* <Radio.Button key="none" value="none">
            None
          </Radio.Button> */}
        </Radio.Group>
      ),
      key: 'comparableOnfrontend',
      label: 'Comparable On Frontend',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key={true} value={true}>
            True
          </Radio.Button>
          <Radio.Button key={false} value={false}>
            False
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'useInRecemondation',
      label: 'Use In Recemondation',
    },
  ]

  const onRemove = (i) => {
    const data = formItemsData.map((e) => {
      if (e._id === i._id) {
        return { ...e, deleted: true }
      }
      return { ...e }
    })
    console.log('sasfs', data, i)
    setformItemsData(data)
  }

  // const handleChnage = () => {}

  const fromItems2 = formItemsData.map((i, ind) => {
    return [
      {
        type: (
          <div>
            <Input
              name={`value[${ind}]`}
              defaultValue={i[`value[${ind}]`]}
              onBlur={(e, w) => console.log('aaaa anshu', e, w)}
              onChange={(e, w) => ({ ...e, [`value[${ind}]`]: e })}
              width="auto"
              required
            />

            <Upload
              name={`image[${ind}]`}
              defaultFileList={
                i[`image[${ind}]`] ? (i[`image[${ind}]`][0]?.url ? i[`image[${ind}]`] : []) : []
              }
              maxCount={1}
              // required
              // onChange={(value, name) => {
              //   console.log('hello', name, value)
              //   setimageList((prev) => ({ ...prev, [name]: value }))
              // }}
              onChange={(file) => {
                setimageList((prev) => ({ ...prev, [`value[${ind}]`]: file[0] }))
                setcustomImage((prev) => ({ ...prev, [`value[${ind}]`]: file[0] }))
              }}
              // name: file[0].originFileObj,
              // [`value[${ind}]`]: file[0].originFileObj

              accept="image/*"
            >
              <Button>
                <Icon type="upload" /> Select File
              </Button>
            </Upload>
            <AddNew onRemove={() => onRemove(i)} attribute="" />
          </div>
        ),
        key: `image[${ind}]`,
        label: 'Value',
        deleted: i.deleted,
        className: 'w-100',
      },
    ]
  })

  const form = (
    <Form.Provider
      initialValues={initialVals}
      onSubmit={submitForm}
      schema={customAttrubitesSchema}
    >
      <Form.Consumer>
        {({ onSubmit, setValues, values }) => {
          useEffect(() => {
            if (conditions.includes(values.inputType)) {
              setValues((e) => ({ ...e, mainValues: formItemsData }))
            }
          }, [values.inputType])
          useEffect(() => {
            setValues((e) => ({ ...e, mainValues: formItemsData }))
          }, [formItemsData])
          let from2 = ''
          if (!isUndefined(values.inputType) && conditions.includes(values.inputType)) {
            from2 = (
              <>
                <AddNew
                  pullRight={false}
                  add
                  onClick={() => {
                    setformItemsData((e) => [...e, { _id: `index[${e.length}]`, deleted: false }])
                  }}
                  attribute=""
                />
                {fromItems2.map((i, index) => {
                  return (
                    <Form
                      // formItemLayout={{ ...formItemLayout }}

                      initialValues={initialVals}
                      key={`links${index}`}
                      formItems={i.filter((j) => j.deleted === false)}
                    />
                  )
                })}
              </>
            )
          }

          return (
            <>
              <Form formItems={formItems} />
              {from2}
              <Button type="primary" onClick={onSubmit}>
                Submit
              </Button>
            </>
          )
        }}
      </Form.Consumer>
    </Form.Provider>
  )
  return form
}

const conditions = ['drop-down', 'multiple-select']

export default withRouter(CustomAttributes)
