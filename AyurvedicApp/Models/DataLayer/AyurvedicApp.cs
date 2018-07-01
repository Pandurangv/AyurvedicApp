namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class AyurvedApp : DbContext
    {
        public AyurvedApp()
            : base("name=AyurvedicApp")
        {
        }

        public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        public virtual DbSet<BaseDignosy> BaseDignosys { get; set; }
        public virtual DbSet<Charge> Charges { get; set; }
        public virtual DbSet<DignosysMaster> DignosysMasters { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<InvoiceDetail> InvoiceDetails { get; set; }
        public virtual DbSet<NadiPariksha> NadiParikshas { get; set; }
        public virtual DbSet<NadiParikshaDetail> NadiParikshaDetails { get; set; }
        public virtual DbSet<OTMedicineBill> OTMedicineBills { get; set; }
        public virtual DbSet<OTMedicineBillDetail> OTMedicineBillDetails { get; set; }
        public virtual DbSet<PatientAdmitDetail> PatientAdmitDetails { get; set; }
        public virtual DbSet<PatientMaster> PatientMasters { get; set; }
        public virtual DbSet<PatientPastIllness> PatientPastIllnesses { get; set; }
        public virtual DbSet<ProductMaster> ProductMasters { get; set; }
        public virtual DbSet<ProductType> ProductTypes { get; set; }
        public virtual DbSet<Receipt> Receipts { get; set; }
        public virtual DbSet<StockDetail> StockDetails { get; set; }
        public virtual DbSet<tblPrescription> tblPrescriptions { get; set; }
        public virtual DbSet<tblPrescriptionDetail> tblPrescriptionDetails { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Charge>()
                .Property(e => e.ChargeName)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Address)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.UserType)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.ContactNo)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Pincode)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.State)
                .IsUnicode(false);

            modelBuilder.Entity<Invoice>()
                .Property(e => e.Desciption)
                .IsUnicode(false);

            modelBuilder.Entity<OTMedicineBill>()
                .Property(e => e.TreatmentDetails)
                .IsUnicode(false);

            modelBuilder.Entity<OTMedicineBill>()
                .Property(e => e.TreatmentPro)
                .IsUnicode(false);

            modelBuilder.Entity<OTMedicineBill>()
                .Property(e => e.TreatmentTime)
                .IsUnicode(false);

            modelBuilder.Entity<PatientMaster>()
                .Property(e => e.Gender)
                .IsUnicode(false);

            modelBuilder.Entity<PatientMaster>()
                .Property(e => e.Occupation)
                .IsUnicode(false);

            modelBuilder.Entity<PatientMaster>()
                .Property(e => e.Dignosys)
                .IsUnicode(false);

            modelBuilder.Entity<PatientMaster>()
                .Property(e => e.EmailId)
                .IsUnicode(false);

            modelBuilder.Entity<PatientMaster>()
                .Property(e => e.BirthTime)
                .IsUnicode(false);

            modelBuilder.Entity<PatientMaster>()
                .Property(e => e.RefContact)
                .IsUnicode(false);

            modelBuilder.Entity<PatientMaster>()
                .Property(e => e.Qualification)
                .IsUnicode(false);

            modelBuilder.Entity<PatientMaster>()
                .Property(e => e.Address1)
                .IsUnicode(false);

            modelBuilder.Entity<PatientMaster>()
                .Property(e => e.FatherOccupation)
                .IsUnicode(false);

            modelBuilder.Entity<PatientPastIllness>()
                .Property(e => e.IllnessFromDays)
                .IsUnicode(false);

            modelBuilder.Entity<ProductMaster>()
                .Property(e => e.ProductName)
                .IsUnicode(false);

            modelBuilder.Entity<ProductMaster>()
                .Property(e => e.UOM)
                .IsUnicode(false);

            modelBuilder.Entity<ProductMaster>()
                .Property(e => e.SubUOM)
                .IsUnicode(false);

            modelBuilder.Entity<ProductMaster>()
                .Property(e => e.ProductContent)
                .IsUnicode(false);

            modelBuilder.Entity<ProductType>()
                .Property(e => e.ProductTyepe)
                .IsUnicode(false);

            modelBuilder.Entity<ProductType>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Receipt>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<StockDetail>()
                .Property(e => e.TransactionType)
                .IsUnicode(false);

            modelBuilder.Entity<StockDetail>()
                .Property(e => e.BatchNo)
                .IsUnicode(false);

            modelBuilder.Entity<tblPrescription>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<tblPrescriptionDetail>()
                .Property(e => e.InjectionName)
                .IsUnicode(false);

            Database.SetInitializer<AyurvedApp>(null);
            base.OnModelCreating(modelBuilder);
        }
    }
}
