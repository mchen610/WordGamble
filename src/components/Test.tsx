import React, { useRef } from 'react';

export const Test = () => {

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = formRef.current;

    const fname = form!.elements[0] as HTMLInputElement;
    const fnameValue = fname.value;
    

    const lname = form!.elements[1] as HTMLInputElement; 
    const lnameValue = lname.value;
    
    console.log(fnameValue, lnameValue);

    // use fnameValue and lnameValue
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label>
        First name:
        <input 
          type="text"  
          name="fname" 
          defaultValue="John"
        />
      </label>

      <label>
        Last name:
        <input
          type="text"
          name="lname" 
          defaultValue="Doe" 
        />
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
}