import { Country, State, City } from "country-state-city";
import { motion } from "framer-motion";
import { useState } from "react";

import FormInputSuggest from "./FormInputSuggest";
import SortableSection from "./SortableSection";
import FormTextarea from "./FormTextarea";
import DateInput from "./DateInput";
import FormInput from "./FormInput";

export default function CVBuilder() {
  const [activeTab, setActiveTab] = useState("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    website: "",
    country: "",
    state: "",
    city: "",
    showCountry: true,
    showState: true,
    showCity: true,
  });

  const [experiences, setExperiences] = useState([
    { company: "", title: "", startDate: "", endDate: "", description: "" },
  ]);

  const [projects, setProjects] = useState([
    { company: "", title: "", date: "", description: "", link: "" },
  ]);

  const handleListChange = (listName, index, e) => {
    const newList = [...(listName  === "experiences" ? experiences : projects)];
    newList[index][e.target.name] = e.target.value;

    if (listName === "experiences") {
      setExperiences(newList);
    } else {
      setProjects(newList);
    }
  };

  const countries = Country.getAllCountries();
  const selectedCountry = countries.find((c) => c.name === formData.country);

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];
  const selectedState = states.find((s) => s.name === formData.state);

  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
      : [];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <div className="border p-6 rounded-lg shadow bg-white">
        <div className="flex space-x-4 border-b mb-4 relative">
          {[
            { id: "contact", label: "بيانات التواصل" },
            { id: "experience", label: "الخبرات" },
            { id: "project", label: "المشاريع" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-2 ${
                activeTab === tab.id
                ? "text-blue-600 font-semibold"
                : "text-gray-500"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {activeTab === "contact" && (
          <div className="space-y-4" dir="rtl">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="الاسم الكامل"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <FormInput
                label="الايميل"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <FormInput
                label="رقم الهاتف"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <FormInput
                label="صفحة لينكدان"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
              <FormInput
                label="الموقع الشخصي"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />

              <div className="col-span-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <FormInputSuggest
                      label="الدولة"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      options={countries.map((c) => c.name)}
                    />
                  </div>
                  <div
                    onClick={() => toggleField("showCountry")}
                    className={`relative h-5 w-10 flex items-center rounded-full cursor-pointer transition ${
                      formData.showCountry ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 h-3 w-3 transform rounded-full bg-white shadow transition ${
                        formData.showCountry ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <FormInputSuggest
                      label="المحافظة"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      options={states.map((s) => s.name)}
                    />
                  </div>
                  <div
                    onClick={() => toggleField("showState")}
                    className={`relative h-5 w-10 flex items-center rounded-full cursor-pointer transition ${
                      formData.showState ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 h-3 w-3 transform rounded-full bg-white shadow transition ${
                        formData.showState ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <FormInputSuggest
                      label="المدينة"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      options={cities.map((s) => s.name)}
                    />
                  </div>
                  <div
                    onClick={() => toggleField("showCity")}
                    className={`relative h-5 w-10 flex items-center rounded-full cursor-pointer transition ${
                      formData.showCity ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 h-3 w-3 transform rounded-full bg-white shadow transition ${
                        formData.showCity ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <SortableSection
            title="خبرة"
            items={experiences}
            setItems={setExperiences}
            emptyItem={{
              company: "",
              title: "",
              startDate: "",
              endDate: "",
              description: "",
            }}
            gender="f"
            itemLabel={(item, index) =>
              item.title && item.title.trim() !== ""
                ? item.title
                : `الخبرة ${index + 1}`
            }
            renderForm={(exp, index) => (
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="المسمى الوظيفي"
                  name="title"
                  value={exp.title}
                  onChange={(e) => handleListChange("experiences", index, e)}
                />
                <FormInput
                  label="الشركة"
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleListChange("experiences", index, e)}
                />
                <DateInput
                  label="تاريخ البداية"
                  name="startDate"
                  value={exp.startDate}
                  maxDate={exp.endDate}
                  onChange={(date) => {
                    const newList = [...experiences];
                    newList[index].startDate = date;
                    setExperiences(newList);
                  }}
                />
                <DateInput
                  label="تاريخ النهاية"
                  name="endDate"
                  value={exp.endDate}
                  minDate={exp.startDate}
                  allowPresent={true}
                  onChange={(date) => {
                    const newList = [...experiences];
                    newList[index].endDate = date;
                    setExperiences(newList);
                  }}
                />
                <FormTextarea
                  label="الوصف"
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleListChange("experiences", index, e)}
                  className="col-span-2"
                />
              </div>
            )}
          />
        )}

        {activeTab === "project" && (
          <SortableSection
            title="مشروع"
            items={projects}
            setItems={setProjects}
            emptyItem={{
              company: "",
              title: "",
              startDate: "",
              endDate: "",
              description: "",
            }}
            gender="m"
            itemLabel={(item, index) =>
              item.title && item.title.trim() !== ""
                ? item.title
                : `المشروع ${index + 1}`
            }
            renderForm={(proj, index) => (
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="اسم المشروع"
                  name="title"
                  value={proj.title}
                  onChange={(e) => handleListChange("projects", index, e)}
                />
                <FormInput
                  label="العميل / الشركة"
                  name="company"
                  value={proj.company}
                  onChange={(e) => handleListChange("projects", index, e)}
                />
                <DateInput
                  label="التاريخ"
                  name="date"
                  value={proj.date}
                  onChange={(date) => {
                    const newList = [...projects];
                    newList[index].date = date;
                    setProjects(newList);
                  }}
                />
                <FormInput
                  label="لينك المشروع"
                  name="link"
                  value={proj.link}
                  onChange={(e) => handleListChange("projects", index, e)}
                />
                <FormTextarea
                  label="الوصف"
                  name="description"
                  value={proj.description}
                  onChange={(e) => handleListChange("projects", index, e)}
                  className="col-span-2"
                />
              </div>
            )}
          />
        )}
      </div>

      <div className="border p-6 rounded-lg shadow bg-white">
        <h1 className="text-2xl font-bold">{formData.name || "الاسم هنا"}</h1>
        <p>
          {formData.email || "الإيميل هنا"} |{" "}
          {formData.phone || "الهاتف هنا"}
        </p>
        <p className="mt-2">
          {formData.city || "المدينة"} - {formData.state || "المحافظة"}
        </p>

        <h2 className="mt-4 text-lg font-semibold">الخبرات</h2>
        <p>{formData.experience || "اكتب خبراتك هنا"}</p>

        <h2 className="mt-4 text-lg font-semibold">التعليم</h2>
        <p>{formData.education || "اكتب تعليمك هنا"}</p>

        <h2 className="mt-4 text-lg font-semibold">المهارات</h2>
        <p>{formData.skills || "اكتب مهاراتك هنا"}</p>
      </div>
    </div>
  );
}
