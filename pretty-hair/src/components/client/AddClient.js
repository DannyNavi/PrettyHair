import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../styles/AddClient.css';


const ClientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/clients/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit form');

        const result = await response.json();
        console.log("Submitting:", data);
          const res = await fetch(`/api/clients/getClientFromPhone/${data.cell}`);
          if (!res.ok) throw new Error('Client not found');
          const client = await res.json();
          navigate(`/viewclient/${client.clientId}`);




    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <form className="clientform" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          autoComplete="off"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          autoComplete="off"
          {...register('email', {
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Cell:</label>
        <input
          type="tel"
          autoComplete="off"
          {...register('cell', {
            required: 'Cell number is required',
            pattern: {
              value: /^[0-9\-+\s()]{7,15}$/,
              message: 'Invalid phone number',
            },
          })}
        />
        {errors.cell && <p>{errors.cell.message}</p>}
      </div>

      <div>
        <label>Allergies:</label>
        <input type="text" {...register('allergies')} />
        {errors.allergies && <p>{errors.allergies.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ClientForm;
