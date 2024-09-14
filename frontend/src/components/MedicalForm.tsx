import React, { useState } from "react";
import MainAxios from "../axios/MainAxios";

interface Props {
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

interface Medicine {
    mid: string;
    quantity: string;
}

function MedicalForm({ setTheme }: Props) {
    const [registrationNumber, setRegistrationNumber] = useState<string>("");
    const [campDate, setCampDate] = useState<string>("");
    const [fields, setFields] = useState<Medicine[]>([
        { mid: "", quantity: "" } as Medicine
    ]);

    const handleThemeChange = () => {
        const newTheme =
            localStorage.getItem("theme") === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const handleAddFields = () => {
        setFields([...fields, { mid: "", quantity: "" }]);
    };

    const handleInputChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        const newFields = fields.map((field, i) => {
            if (i === index) {
                return { ...field, [name]: value };
            }
            return field;
        });
        setFields(newFields);
    };

    const handleRegistrationNumberChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRegistrationNumber(event.target.value);
    };

    const handleCampDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCampDate(event.target.value);
    };

    const handleSubmit = (
        registrationNumber: string,
        campDate: string,
        fields: Medicine[]
    ) => {
        MainAxios.post("/medical-camp", {
            registrationNumber,
            campDate,
            fields
        })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
            });
    };

    return (
        <div className="content-section mx-auto mt-10 relative p-4">
            <label className="absolute top-4 right-4 swap swap-rotate">
                <input
                    type="checkbox"
                    className="theme-controller"
                    onChange={handleThemeChange}
                />
                <svg
                    className="swap-off fill-current w-9 h-9"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                <svg
                    className="swap-on fill-current w-9 h-9"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
            </label>
            <h1 className="text-4xl text-center">Medical Camp</h1>
            <div className="flex justify-center mt-8">
                <h2 className="text-2xl mt-4 mr-4">Registration Number -</h2>
                <input
                    type="number"
                    className="input input-bordered mt-3 text-xl"
                    value={registrationNumber}
                    onChange={handleRegistrationNumberChange}
                    required
                />
            </div>
            <div className="flex justify-center mt-8">
                <h2 className="text-2xl mt-4 mr-4">Camp Date -</h2>
                <input
                    type="date"
                    className="input input-bordered mt-3 text-xl"
                    value={campDate}
                    onChange={handleCampDateChange}
                    required
                />
            </div>
            <div className="flex justify-between mt-8 mb-8">
                <div className="w-1/2 flex flex-col items-center">
                    <h2 className="text-3xl text-center">MID</h2>
                    {fields.map((field, index) => (
                        <div key={index} className="flex mt-4">
                            <h1 className="text-3xl mr-6 mt-1">{index + 1}.</h1>
                            <input
                                type="number"
                                name="mid"
                                value={field.mid}
                                onChange={(event) =>
                                    handleInputChange(index, event)
                                }
                                className="input w-2/3 input-bordered text-xl"
                            />
                        </div>
                    ))}
                </div>
                <div className="w-1/2 flex flex-col items-center">
                    <h2 className="text-3xl text-center">Quantity</h2>
                    {fields.map((field, index) => (
                        <input
                            key={index}
                            type="number"
                            name="quantity"
                            value={field.quantity}
                            onChange={(event) =>
                                handleInputChange(index, event)
                            }
                            className="input input-bordered w-1/4 mt-4 text-xl"
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-8 w-1/2 mb-4 mx-auto">
                <div className="text-center w-1/2">
                    <button
                        className="btn btn-primary text-base"
                        onClick={handleAddFields}
                    >
                        <i className="bi bi-plus-square text-lg"></i>
                        Add
                    </button>
                </div>
                <div className="text-center w-1/2">
                    <button
                        type="submit"
                        className="btn btn-success text-base"
                        onClick={() => {
                            handleSubmit(registrationNumber, campDate, fields);
                        }}
                    >
                        <i className="bi bi-cloud-arrow-up text-2xl"></i>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MedicalForm;
