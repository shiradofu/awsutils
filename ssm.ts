import {
  SSMClient,
  PutParameterCommand,
  PutParameterCommandInput,
} from '@aws-sdk/client-ssm'
import { REGION } from './config'

// 既存のパラメータを取得したい場合:
// aws ssm describe-parameters \
//   --parameter-filters "Key=Name,Option=Contains,Values={/parameter/prefix}" \
//   --output json --query "Parameters[*].Name"

const inputs: PutParameterCommandInput[] = [
  { Name: '', Value: '' },
]

const main = async () => {
  const client = new SSMClient({ region: REGION })
  for (const i of inputs) {
    try {
      await client.send(
        new PutParameterCommand({ Type: 'SecureString', Overwrite: true, ...i })
      )
      console.log(`created: ${i.Name}`)
    } catch (e) {
      console.error(`error: ${i.Name}`)
      console.error(e)
      return
    }
  }
}

main()
