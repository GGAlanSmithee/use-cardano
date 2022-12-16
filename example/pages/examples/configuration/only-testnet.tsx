import { ExampleWrapper } from "components/ExampleWrapper"
import { baseConfig } from "config/use-cardano-config"
import { isNil } from "lodash"
import { useCardanoContext, utility, WalletProviderSelector } from "use-cardano"

const OnlyTestnetExample = () => {
  const { networkId, isValid } = useCardanoContext()

  return (
    <>
      <div>
        <WalletProviderSelector />
      </div>

      <br />

      <div>Try switching provider and network</div>

      {!isNil(networkId) && (
        <>
          <br />

          <div>Connected to {utility.toNetworkName(networkId)}</div>
        </>
      )}

      <br />

      <div>
        use-cardano is valid and can be used: <b>{isValid ? "yes" : "no"}</b>
      </div>
    </>
  )
}

const OnlyTestnetExamplePage = () => (
  <ExampleWrapper options={{ ...baseConfig, allowedNetworks: ["testnet"] }}>
    <OnlyTestnetExample />
  </ExampleWrapper>
)

export default OnlyTestnetExamplePage
