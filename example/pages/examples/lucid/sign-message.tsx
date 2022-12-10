import { baseConfig } from "config/use-cardano-config"
import { utf8ToHex } from "lucid-cardano"
import { useCallback, useState } from "react"
import styles from "styles/example.module.css"
import { useCardano, useCardanoContext, WalletProviderSelector } from "use-cardano"

const RegisterPoolExamplePage = () => {
  useCardano({ ...baseConfig, allowedNetworks: ["testnet"] })
  const {
    lucid,
    showToaster,
    hideToaster,
    account: { address },
  } = useCardanoContext()

  const [message, setMessage] = useState<string>()
  const [isSigning, setIsSigning] = useState(false)

  const signMessage = useCallback(async () => {
    if (!lucid || !address) return

    setIsSigning(true)

    try {
      const payload = utf8ToHex("Hello from Lucid!")

      const signedMessage = await lucid.newMessage(address, payload).sign()
      const hasSigned: boolean = lucid.verifyMessage(address, payload, signedMessage)

      if (!hasSigned) throw new Error("Could not sign message")

      showToaster("Signed message", message)
      setMessage(undefined)
    } catch (e) {
      if (e instanceof Error) showToaster("Could not sign message", e.message)
    } finally {
      setIsSigning(false)
    }
  }, [lucid, address, message, showToaster])

  return (
    <>
      <div>
        <WalletProviderSelector />
      </div>

      <br />

      <div>
        This is a port of the Lucid &quot;Sign Message&quot; example. It lets you enter a message
        and sign it on the blockchain using lucid.
      </div>

      <br />

      <div>
        <label>
          <span className={styles.label}>Message</span>
          <input
            className={styles.input}
            type="text"
            name="message"
            value={message || ""}
            onChange={(e) => setMessage(e.target.value.toString())}
          />
        </label>
      </div>

      <br />

      <div>
        <button
          disabled={!lucid || !address || isSigning || !message}
          className={styles.button}
          onClick={() => {
            hideToaster()
            signMessage()
          }}
        >
          Sign Message
        </button>

        {isSigning && <span className={styles.loading}> Signing...</span>}
      </div>
    </>
  )
}

export default RegisterPoolExamplePage