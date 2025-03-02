// In ./EmployerProfileSections/updateEmployerProfile.js
export const updateEmployerAPI = async (employerId, data) => {
    try {
        const response = await fetch(`http://localhost:3000/employers//Employer_Update_Profile/${employerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        return await response.json();
    } catch (error) {
        console.error('API error:', error);
        return { success: false, error: error.message };
    }
};