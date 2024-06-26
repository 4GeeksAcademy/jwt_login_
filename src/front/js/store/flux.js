const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
		
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
		}
	
	}
};
};

export default getState;
