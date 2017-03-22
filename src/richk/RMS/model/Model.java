package richk.RMS.model;

import java.util.List;

public interface Model {

	public List<Device> RefreshDevice() throws ModelException;
	public boolean AddDevice(Device device) throws ModelException;
	public boolean RemoveDevice(String string) throws ModelException;
}