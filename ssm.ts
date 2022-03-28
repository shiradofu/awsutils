import { SSM } from 'aws-sdk'
import { PutParameterRequest } from 'aws-sdk/clients/ssm'
import { REGION } from './config'

const parameters: PutParameterRequest[] = [
  { Name: '', Value: '', Type: 'SecureString' },
]

const main = async () => {
  const ssm = new SSM({ region: REGION })
  for (const p of parameters) {
    try {
      await ssm.putParameter(p).promise()
      console.log(`created: ${p.Name}`)
    } catch (e) {
      console.error(`error: ${p.Name}`)
      console.error(e)
      return
    }
  }
}

main()
