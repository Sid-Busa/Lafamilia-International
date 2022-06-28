const useRolePermission = () => {
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  return userId && role;
};

export default useRolePermission;
