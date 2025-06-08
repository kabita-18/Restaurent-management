package example.com.model;

public class PasswordUpdateRequest {
	private String newPassword;

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

	@Override
	public String toString() {
		return "PasswordUpdateRequest [newPassword=" + newPassword + "]";
	}

	public PasswordUpdateRequest(String newPassword) {
		super();
		this.newPassword = newPassword;
	}

	public PasswordUpdateRequest() {
		super();
	}
    
}
