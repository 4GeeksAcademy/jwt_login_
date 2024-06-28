const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			user:{},
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			
		
		// Add the signup action
		signup: async (email, username, password, name) => {
			try {
				const response = await fetch(process.env.BACKEND_URL + "api/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						username: username,
						password: password,
						name: name
					})
				});
				
				if (!response.ok) {
					throw new Error("Failed to create user");
				}

				const data = await response.json();
				console.log("User created successfully:", data);

				// Optionally, update the store or perform other actions
				// setStore({ ... });

				return data;
			} catch (error) {
				console.error("Error during signup:", error);
			}
		},
		login: async (email, password) => {
			try {
				const response = await fetch(process.env.BACKEND_URL + "api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				});
				
				if (!response.ok) {
					throw new Error("Failed to login");
				}
		
				const data = await response.json();
				console.log("User logged in successfully:", data);
		
				// Save token and user data in localStorage
				localStorage.setItem("accessToken", data.access_token);
				localStorage.setItem("user", JSON.stringify(data.user));
		
				// Update the store with user data
				setStore({ user: data.user });
		
				return data;
			} catch (error) {
				console.error("Login error:", error);
			}
		}
	}
};
};

export default getState;
