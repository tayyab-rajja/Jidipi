export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export const uploadUserLogo = async (action: any) => {
    const headers = new Headers({
        Authorization: `Bearer ${action.authToken}`,
    });

    const formData = new FormData();
    formData.append("file", action.file);
    const url = action.default
        ? `${API_URL}/user/logo?default=true`
        : `${API_URL}/user/logo`;
    const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers,
    });

    return response;
};

export const getUserLogos = async (action: any) => {
    const headers = new Headers({
        Authorization: `Bearer ${action.authToken}`,
        'Content-Type': 'application/json',
    });

    const url = `${API_URL}/user/logos?searchKey=${action.searchKey}`;

    const response = await fetch(url, {
        method: 'GET',
        headers,
    }).then(res => res.json());

    return response.logos;
};
