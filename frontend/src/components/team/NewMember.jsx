import react from 'react'

const NewMember = () => {
  return (
    <div>
      <h1>New Member</h1>
      <form>
        <label>
          Full Name:
          <input type="text" name="name" />
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
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </label>
        <button type="submit">Add Member</button>
      </form>
    </div>
  )
}
export default NewMember