using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RL.Data;
using RL.Data.DataModels;

namespace RL.Backend.Controllers
{
    [ApiController]
    [Route("api/procedures/{planProcedureId}/users")]
    public class ProcedureUsersController : ControllerBase
    {
        private readonly RLContext _context;

        public ProcedureUsersController(RLContext context)
        {
            _context = context;
        }

        // GET assigned users
        [HttpGet]
        public async Task<IActionResult> GetUsersForProcedure(int planProcedureId)
        {
            var users = await _context.ProcedureUsers
                .Where(pu => pu.PlanProcedureId == planProcedureId)
                .Include(pu => pu.User)
                .Select(pu => new { pu.User.UserId, pu.User.Name })
                .ToListAsync();

            return Ok(users);
        }

        // POST assign a user
        [HttpPost]
        public async Task<IActionResult> AssignUserToProcedure(int planProcedureId, [FromBody] int userId)
        {
            var exists = await _context.ProcedureUsers
                .AnyAsync(pu => pu.PlanProcedureId == planProcedureId && pu.UserId == userId);

            if (!exists)
            {
                var procedureUser = new ProcedureUser
                {
                    PlanProcedureId = planProcedureId,
                    UserId = userId
                };
                _context.ProcedureUsers.Add(procedureUser);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        // DELETE a single user
        [HttpDelete("{userId}")]
        public async Task<IActionResult> RemoveUserFromProcedure(int planProcedureId, int userId)
        {
            var pu = await _context.ProcedureUsers
                .FirstOrDefaultAsync(p => p.PlanProcedureId == planProcedureId && p.UserId == userId);

            if (pu == null)
                return NotFound();

            _context.ProcedureUsers.Remove(pu);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE all users
        [HttpDelete]
        public async Task<IActionResult> RemoveAllUsersFromProcedure(int planProcedureId)
        {
            var pus = _context.ProcedureUsers
                .Where(p => p.PlanProcedureId == planProcedureId);

            _context.ProcedureUsers.RemoveRange(pus);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
