using Common.Domain.Interfaces;

namespace Common.Domain.Wrappers
{
    public class RequestEmpty : Request<int>, ITracking
    {
        public Guid TrackingId { get; set; }

        public RequestEmpty()
        {
            this.TrackingId = new Guid();
        }
    }
}
