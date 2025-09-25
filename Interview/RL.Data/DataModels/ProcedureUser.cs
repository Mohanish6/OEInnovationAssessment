namespace RL.Data.DataModels
{
    public class ProcedureUser
    {
        public int Id { get; set; }

        // Foreign Keys
        public int PlanProcedureId { get; set; }
        public int UserId { get; set; }

        // Navigation Properties
        public PlanProcedure PlanProcedure { get; set; }
        public User User { get; set; }
    }
}
