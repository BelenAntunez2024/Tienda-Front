const Login = () => {
   return (
        <main>
            <div>
                <img src="/public/logo.png" alt="logo" id="Logo"/>
            </div>
            <h1>Wisteria</h1>

            <form className="formContainer">  
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required />
                </div>
                <button type="submit">Login</button>

                <a href="#" id="editPassword">Olvidaste tu contraseña?</a>
            </form>
        </main>

    );
   
};
export default Login;