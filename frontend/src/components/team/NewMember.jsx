import react from 'react'

const NewMember = () => {

  const handleSubmit = (e) =>{
    e.preventDefault()
    const form = e.target
    const fullName = form.fullName.value
    const phone = form.phone.value
    const email = form.email.value
    const role = form.role.value
    const member = {fullName, phone, email, role}
    const url = import.meta.env.VITE_API_URL+"/api/team/members"
  }

  return (
    <div>
      <h1>New Member</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Role:
          <select name="role">
            {/* <option value="admin">Admin</option> */}
            <option value="member">Member</option>
          </select>
        </label>
        <button type="submit">Add Member</button>
      </form>
    </div>
  )
}
export default NewMember