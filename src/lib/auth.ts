export const isLoggedIn = () => {
	return fetch('https://uber2u-server-glovbogi2a-uc.a.run.app/auth/ping').then(async (r) => {
		if (r.status == 401) {
			const json = await r.json();
			await new Promise((r) => setTimeout(r, 2000));
			throw new Error(json.message);
		}
	});
};
