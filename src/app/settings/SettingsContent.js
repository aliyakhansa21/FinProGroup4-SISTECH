"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ChevronRight, Save, User, MapPin, Bell, Globe, ShieldCheck, Mail, Phone, Lock, EyeOff, Plus, Heart } from "lucide-react";
import Image from "next/image";

// Reusable Components
const SectionCard = ({ children, title, description }) => (
  <div className="bg-white rounded-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-5 md:p-6 mb-6">
    {(title || description) && (
      <div className="mb-5 pb-4 border-b border-gray-100">
        {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
    )}
    {children}
  </div>
);

const InputField = ({ label, type = "text", placeholder, icon: Icon, defaultValue, storageKey }) => {
  const [value, setValue] = storageKey 
    ? useLocalStorage(storageKey, defaultValue) 
    : useState(defaultValue);

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent block p-3 transition-all ${Icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
};

const ToggleRow = ({ title, description, defaultChecked, storageKey }) => {
  const [checked, setChecked] = storageKey 
    ? useLocalStorage(storageKey, defaultChecked) 
    : useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between py-3">
      <div className="pr-4">
        <h4 className="text-[15px] font-semibold text-gray-800">{title}</h4>
        {description && <p className="text-[13px] text-gray-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-[#ee537f]' : 'bg-gray-200'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
};

const SelectRow = ({ title, options, defaultValue, storageKey }) => {
  const [value, setValue] = storageKey 
    ? useLocalStorage(storageKey, defaultValue) 
    : useState(defaultValue);

  return (
    <div className="flex items-center justify-between py-3">
      <h4 className="text-[15px] font-semibold text-gray-800">{title}</h4>
      <select 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block p-2 outline-none"
      >
        {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
};

// --- Sub-page Components ---

export function AccountSettings() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">Account Settings</h2>
      
      <SectionCard title="Edit Profile" description="Update your personal details and public profile.">
        <div className="flex items-center gap-5 mb-6">
          <div className="relative w-20 h-20 rounded-full bg-[#EE537F] overflow-hidden">
            <Image src="https://api.dicebear.com/7.x/notionists/svg?seed=Sora&backgroundColor=EE537F" alt="Avatar" fill className="object-cover" />
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors">
            Change Avatar
          </button>
        </div>
        <InputField label="Full Name" icon={User} defaultValue="Jane Doe" storageKey="sora_full_name" />
        <InputField label="Username" icon={User} defaultValue="@janedoe" storageKey="sora_username" />
        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 bg-[#ee537f] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#d6416b] transition-colors">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Contact Information" description="Manage your phone number and email address.">
        <InputField label="Phone Number" icon={Phone} type="tel" defaultValue="+62 812 3456 7890" storageKey="sora_phone" />
        <InputField label="Email Address" icon={Mail} type="email" defaultValue="jane.doe@example.com" storageKey="sora_email" />
      </SectionCard>

      <SectionCard title="Security" description="Update your password to keep your account secure.">
        <InputField label="Current Password" icon={Lock} type="password" placeholder="••••••••" />
        <InputField label="New Password" icon={Lock} type="password" placeholder="••••••••" />
        <div className="mt-6">
          <button className="text-sm font-semibold text-[#ee537f] hover:underline">Update Password</button>
        </div>
      </SectionCard>
    </div>
  );
}

export function SafetySettings() {
  const defaultContacts = [
    { id: "1", name: "Mom", phone: "+628111111111", avatar: "M", selected: true, status: "Sending..." },
    { id: "2", name: "Dad", phone: "+628222222222", avatar: "D", selected: false, status: "Sending..." }
  ];
  const [contacts, setContacts] = useLocalStorage("sos_trusted_contacts", defaultContacts);

  const removeContact = (indexToRemove) => {
    setContacts(contacts.filter((_, index) => index !== indexToRemove));
  };

  const addContact = () => {
    const name = window.prompt("Enter contact name:");
    if (!name) return;
    const phone = window.prompt("Enter contact phone number:");
    if (!phone) return;
    
    setContacts([...contacts, { 
      id: Date.now().toString(), 
      name, 
      phone, 
      avatar: name.substring(0, 2).toUpperCase(),
      selected: false,
      status: "Sending..."
    }]);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">Safety Configurations</h2>
      
      <SectionCard title="Trusted Contacts" description="People who will be notified when you trigger an SOS.">
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase">
                  {contact.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.phone}</p>
                </div>
              </div>
              <button onClick={() => removeContact(index)} className="text-xs text-red-500 font-semibold px-2 py-1 hover:bg-red-50 rounded">Remove</button>
            </div>
          ))}
          <button onClick={addContact} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-semibold hover:border-[#ee537f] hover:text-[#ee537f] transition-colors">
            <Plus className="w-4 h-4" /> Add New Contact
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Emergency Message" description="The default message sent during an SOS alert.">
        <textarea 
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-pink-500 p-3 h-24 outline-none resize-none"
          defaultValue="I am in an emergency! Please check my live location and contact me immediately."
          onChange={(e) => {
            if (typeof window !== "undefined") {
              window.localStorage.setItem("sora_sos_message", e.target.value);
            }
          }}
        ></textarea>
        <div className="mt-3 flex justify-end">
          <button className="text-sm font-semibold text-[#ee537f] hover:underline">Save Message</button>
        </div>
      </SectionCard>

      <SectionCard title="SOS Settings">
        <SelectRow title="SOS Hold Duration" options={["3 Seconds", "5 Seconds", "10 Seconds"]} defaultValue="5 Seconds" storageKey="sora_sos_duration" />
        <div className="my-2 h-[1px] bg-gray-100" />
        <ToggleRow title="Auto Check-in Reminders" description="Remind me to check in during a Safe Commute." defaultChecked={true} storageKey="sora_auto_checkin" />
        <div className="my-2 h-[1px] bg-gray-100" />
        <SelectRow title="Default Route Preference" options={["Safest", "Fastest", "Balanced"]} defaultValue="Safest" storageKey="sora_default_route" />
      </SectionCard>
    </div>
  );
}

export function PrivacySettings() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">Privacy</h2>
      
      <SectionCard>
        <ToggleRow 
          title="Report Anonymously by Default" 
          description="Your username will be hidden when you post a new incident report." 
          defaultChecked={true} 
          storageKey="sora_anonymous_report"
        />
        <div className="my-2 h-[1px] bg-gray-100" />
        <div className="flex items-center justify-between py-3 cursor-pointer group">
          <div>
            <h4 className="text-[15px] font-semibold text-gray-800 group-hover:text-[#ee537f] transition-colors">Location Permissions</h4>
            <p className="text-[13px] text-gray-500 mt-0.5">Manage when the app can access your GPS.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#ee537f] transition-colors" />
        </div>
        <div className="my-2 h-[1px] bg-gray-100" />
        <div className="flex items-center justify-between py-3 cursor-pointer group">
          <div>
            <h4 className="text-[15px] font-semibold text-gray-800 group-hover:text-[#ee537f] transition-colors">Data & Privacy</h4>
            <p className="text-[13px] text-gray-500 mt-0.5">Manage your personal data and account deletion.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#ee537f] transition-colors" />
        </div>
      </SectionCard>
    </div>
  );
}

export function NotificationSettings() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">Notifications</h2>
      
      <SectionCard>
        <ToggleRow title="SOS Alerts" description="Receive critical alerts when a trusted contact triggers an SOS." defaultChecked={true} storageKey="sora_notif_sos" />
        <div className="my-2 h-[1px] bg-gray-100" />
        <ToggleRow title="Nearby Reports" description="Get notified about high-risk incidents reported near you." defaultChecked={true} storageKey="sora_notif_reports" />
        <div className="my-2 h-[1px] bg-gray-100" />
        <ToggleRow title="Safety Tips" description="Weekly community safety tips and app updates." defaultChecked={false} storageKey="sora_notif_tips" />
        <div className="my-2 h-[1px] bg-gray-100" />
        <ToggleRow title="Sharing Requests" description="Notify me when someone shares their live location with me." defaultChecked={true} storageKey="sora_notif_share" />
      </SectionCard>
    </div>
  );
}

export function PreferencesSettings() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">Preferences</h2>
      
      <SectionCard>
        <SelectRow title="Language" options={["English", "Indonesian"]} defaultValue="English" storageKey="sora_language" />
        <div className="my-2 h-[1px] bg-gray-100" />
        <SelectRow title="Distance Unit" options={["Kilometers (km)", "Miles (mi)"]} defaultValue="Kilometers (km)" storageKey="sora_distance_unit" />
        <div className="my-2 h-[1px] bg-gray-100" />
        <ToggleRow title="Dark Mode" description="Use a dark theme for the app interface." defaultChecked={false} storageKey="sora_dark_mode" />
      </SectionCard>
    </div>
  );
}

export function SupportSettings() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">Support & About</h2>
      
      <SectionCard>
        <div className="flex items-center justify-between py-3 cursor-pointer group">
          <h4 className="text-[15px] font-semibold text-gray-800 group-hover:text-[#ee537f] transition-colors">Help Center</h4>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#ee537f] transition-colors" />
        </div>
        <div className="my-2 h-[1px] bg-gray-100" />
        <div className="flex items-center justify-between py-3 cursor-pointer group">
          <h4 className="text-[15px] font-semibold text-gray-800 group-hover:text-[#ee537f] transition-colors">Contact Us</h4>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#ee537f] transition-colors" />
        </div>
        <div className="my-2 h-[1px] bg-gray-100" />
        <div className="flex items-center justify-between py-3 cursor-pointer group">
          <h4 className="text-[15px] font-semibold text-gray-800 group-hover:text-[#ee537f] transition-colors">Rate Us</h4>
          <Heart className="w-5 h-5 text-gray-400 group-hover:text-[#ee537f] transition-colors" />
        </div>
        <div className="my-2 h-[1px] bg-gray-100" />
        <div className="flex items-center justify-between py-3 cursor-pointer group">
          <h4 className="text-[15px] font-semibold text-gray-800 group-hover:text-[#ee537f] transition-colors">Terms & Privacy Policy</h4>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#ee537f] transition-colors" />
        </div>
      </SectionCard>
      
      <div className="text-center mt-8 text-sm text-gray-400 font-medium">
        Sora App<br/>
        Version 1.0.0
      </div>
    </div>
  );
}
