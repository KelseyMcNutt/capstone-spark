import  { useState, React } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../../services/userService"

export const Login = () => {
  const [email, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: user.id,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
  <div className="background">
  <main className="auth-container" style={{backgroundImage: `url(https://garden.spoonflower.com/c/14662424/p/f/m/rhTG9U3MqzDPNo3bEsZZw6MFpX5dAelDyfZFUWGBaXYeOPzWykxiEqI/Yellow%20regular%20star%20print%20on%20white%20-%20large.jpg)`}}>
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header">spark</h1>
          <h2>Please sign in</h2>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => set(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register" style={{ color: "black" }}>Not a member yet?</Link>
      </section>
    </main>
    </div>
  )
}

