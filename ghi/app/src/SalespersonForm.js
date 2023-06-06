import React, {useEffect, useState} from 'react';

function SalespersonForm() {
    const [first_name, setFirstName] = useState("");
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const [last_name, setLastName] = useState("");
    const handleLastNameChange = (event) => {
        setLastNameChange(event.target.value);
    }

    const [employee_id, setEmployeeId] = useState("");
        const handleEmployeeIdChange = (event) => {
            setEmployeeId(event.target.value);
        }

    const handleSubmit = async (event) => {
        event.preventDefault();
    }
}
